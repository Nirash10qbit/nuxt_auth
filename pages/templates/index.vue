<template>
  <div>

    <!-- Back button & create subscription button -->

    <div class="p-2 px-4 bg-white border-top-3">
      <b-row class="d-flex">
        <b-col class="mr-auto">

          <div class="d-flex flex-row">
            <div class="p-2">
              <b-button
                class="btn-sm-block border-1"
                variant="white"
                :to="{ path: '/home'}">
                <md-icon class="">
                  arrow_back_ios
                </md-icon>
              </b-button>
            </div>
            <div class="pt-3">
              <h5>
                All Customers
              </h5>
            </div>
          </div>
        </b-col>
        <b-col class="pt-2">
          <b-button
            class="btn-sm-block float-right border-1"
            variant="primary"
            :to="{ path: '/templates/new-customer'}">
            <md-icon class="mr-1">
              add
            </md-icon>
            <span>
              create subscription
            </span>
          </b-button>
        </b-col>
      </b-row>
    </div>

    <!-- Search Button -->

    <div class="p-2 px-4 bg-white border-top-3">
      <b-row class="d-flex">
        <b-col class="mr-auto">
          <div class="d-flex flex-row">
            <div class="p-1">
              <div
                class="flex search-form form-control-rounded search-form--light"
                style="min-width: 400px;">
                <b-form-input
                  placeholder="Search Customer name / Id " />
                <b-btn
                  class="pr-3"
                  type="submit"
                  variant="flush">
                  <md-icon v-text="'search'" />
                </b-btn>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="p-3">
      <b-card>
        <div>
          <!-- search input -->
          <div class="custom-search d-flex justify-content-end">
            <b-form-group>
              <div class="d-flex align-items-center">
                <label class="mr-1">Search</label>
                <b-form-input
                  v-model="searchTerm"
                  placeholder="Search"
                  type="text"
                  class="d-inline-block" />
              </div>
            </b-form-group>
          </div>

          <!-- table -->
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :rtl="direction"
            :search-options="{
              enabled: true,
              externalQuery: searchTerm }"
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
              selectionInfoClass: 'custom-class',
              selectionText: 'rows selected',
              clearSelectionText: 'clear',
              disableSelectInfo: true, // disable the select info panel on top
              selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
            }"
            :pagination-options="{
              enabled: true,
              perPage:pageLength
            }">
            <template
              slot="table-row"
              slot-scope="props">

              <!-- Column: Name -->
              <span
                v-if="props.column.field === 'fullName'"
                class="text-nowrap">
                <b-avatar
                  :src="props.row.avatar"
                  class="mx-1" />
                <span class="text-nowrap">{{ props.row.fullName }}</span>
              </span>

              <!-- Column: Status -->
              <span v-else-if="props.column.field === 'status'">
                <b-badge :variant="statusVariant(props.row.status)">
                  {{ props.row.status }}
                </b-badge>
              </span>

              <!-- Column: Action -->
              <span v-else-if="props.column.field === 'action'">
                <span>
                  <b-dropdown
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret>
                    <template v-slot:button-content>
                      <feather-icon
                        icon="MoreVerticalIcon"
                        size="16"
                        class="text-body align-middle mr-25" />
                    </template>
                    <b-dropdown-item>
                      <feather-icon
                        icon="Edit2Icon"
                        class="mr-50" />
                      <span>Edit</span>
                    </b-dropdown-item>
                    <b-dropdown-item>
                      <feather-icon
                        icon="TrashIcon"
                        class="mr-50" />
                      <span>Delete</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </span>
              </span>

              <!-- Column: Common -->
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>

            <!-- pagination -->
            <template
              slot="pagination-bottom"
              slot-scope="props">
              <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-center mb-0 mt-1">
                  <span class="text-nowrap ">
                    Showing 1 to
                  </span>
                  <b-form-select
                    v-model="pageLength"
                    :options="['3','5','10']"
                    class="mx-1"
                    @input="(value)=>props.perPageChanged({currentPerPage:value})" />
                  <span class="text-nowrap"> of {{ props.total }} entries </span>
                </div>
                <div>
                  <b-pagination
                    :value="1"
                    :total-rows="props.total"
                    :per-page="pageLength"
                    first-number
                    last-number
                    align="right"
                    prev-class="prev-item"
                    next-class="next-item"
                    class="mt-1 mb-0"
                    @input="(value)=>props.pageChanged({currentPage:value})">
                    <template #prev-text>
                      <feather-icon
                        icon="ChevronLeftIcon"
                        size="18" />
                    </template>
                    <template #next-text>
                      <feather-icon
                        icon="ChevronRightIcon"
                        size="18" />
                    </template>
                  </b-pagination>
                </div>
              </div>
            </template>
          </vue-good-table>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
export default {
  layout:"sticky",
  // middleware: ['auth', 'verified'],
  data() {
    return {
      pageLength: 3,
      dir: false,
      columns: [
        {
          label: 'Name',
          field: 'fullName',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Date',
          field: 'startDate',
        },
        {
          label: 'Salary',
          field: 'salary',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
      status: [{
        1: 'Current',
        2: 'Professional',
        3: 'Rejected',
        4: 'Resigned',
        5: 'Applied',
      },
        {
          1: 'light-primary',
          2: 'light-success',
          3: 'light-danger',
          4: 'light-warning',
          5: 'light-info',
        }],
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    this.$http.get('/good-table/basic')
      .then(res => { this.rows = res.data })
  },
}
</script>

